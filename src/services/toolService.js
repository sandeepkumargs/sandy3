import fs from 'fs';
import { exec } from 'child_process';

const compileRunJava = async (javaCode) => {
  let svcResponse = {
    "response": [],
    "http_status": 0,
    "status": "OK"
  };
  console.log("in compileRunJava service ", javaCode);
  try {
    // Split the Java code by 'public class' occurrences
    const publicClasses = javaCode.split(/(?=public class)/g);

    // Variable to store the file name with main method
    let mainFileName;

    // Create separate Java files for each public class
    await Promise.all(publicClasses.map(async (classCode) => {
      const className = classCode.match(/public class (\w+)/)[1];
      const fileName = `${className}.java`;

      // Write class code to a separate Java file
      await new Promise((resolve, reject) => {
        fs.writeFile(fileName, classCode, (err) => {
          if (err) {
            console.error(`Error writing ${fileName}: ${err}`);
            svcResponse.response.push(`Error writing ${fileName}: ${err}`);
            svcResponse.http_status = 500;
            svcResponse.status = "ERR";
            reject(err);
          } else {
            console.log(`${fileName} generated successfully.`);
            resolve();
          }
        });
      });

      // Check if the class contains a main method
      if (/public static void main\(String\[\] args\)/.test(classCode)) {
        mainFileName = fileName;
      }
    }));

    // If a main file is found, compile it using javac
    if (mainFileName) {
      await new Promise((resolve, reject) => {
        exec(`javac ${mainFileName}`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error compiling ${mainFileName}: ${error}`);
            svcResponse.response.push(`Error compiling ${mainFileName}: ${error}`);
            svcResponse.http_status = 500;
            svcResponse.status = "ERR";
            reject(error);
          } else {
            svcResponse.response.push(`Compilation successful: ${stdout}`);
            console.log(`Compilation successful: ${stdout}`);
            resolve();
          }
        });
      });

      // If compilation is successful, run the Java program using java command
      await new Promise((resolve, reject) => {
        exec(
          `java ${mainFileName.split(".")[0]}`,
          (javaError, javaStdout, javaStderr) => {
            if (javaError) {
              console.error(`Error running ${mainFileName}: ${javaError}`);
              svcResponse.response.push(`Error running ${mainFileName}: ${javaError}`);
              svcResponse.http_status = 500;
              svcResponse.status = "ERR";
              reject(javaError);
            } else {
              console.log(`Execution successful: ${javaStdout}`);
              svcResponse.response.push(`Execution successful: ${javaStdout}`);
              svcResponse.http_status = 200;
              svcResponse.status = "OK";
              resolve();
            }
          },
        );
      });
    } else {
      svcResponse.response.push("No main method found..");
      svcResponse.http_status = 200;
      svcResponse.status = "OK";
    }
  } catch (error) {
    console.error("Error parsing Java code:", error);
    svcResponse.response.push(`Error parsing Java code. ${error}`);
    svcResponse.http_status = 500;
    svcResponse.status = "ERR";
  }

  return svcResponse;
};

export default {
  compileRunJava,
};
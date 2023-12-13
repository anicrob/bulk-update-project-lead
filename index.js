var fs = require("fs");
var util = require("util");
var log_file = fs.createWriteStream(__dirname + "/debug.log", { flags: "w" });
var log_stdout = process.stdout;
console.log = function (d) {
  log_file.write(util.format(d) + "\n");
  log_stdout.write(util.format(d) + "\n");
};
require("dotenv").config();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const index = [
  0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750,
  800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350, 1400,
  1450, 1500, 1550, 1600, 1650, 1700, 1750, 1800, 1850, 1900, 1950, 2000, 2050,
  2100, 2150, 2200, 2250, 2300, 2350, 2400, 2450, 2500, 2550, 2600, 2650, 2700,
  2750, 2800, 2850, 2900, 2950,
];
let count = 0;
var fs = require("fs");
var util = require("util");
var log_file = fs.createWriteStream(__dirname + "/debug.log", { flags: "w" });
var log_stdout = process.stdout;
console.log = function (d) {
  log_file.write(util.format(d) + "\n");
  log_stdout.write(util.format(d) + "\n");
};
const projectsToChangeLead = [];

const findProjectsToChangeLead = async () => {
  await Promise.all(
    index.map(async (i) => {
      const response = await fetch(
        `${process.env.URL}/rest/api/3/project/search?startAt=${i}&expand=lead`,
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${process.env.API_KEY}`,
            Accept: "application/json",
          },
        }
      );
      if (response.status !== 200) {
        console.log(
          "error:",
          `${response.status}: ${response.statusText} at index, ${i}`
        );
        return;
      }
      let { values } = await response.json();
      if (values) {
        values.map((project) => {
          if (
            project.lead.accountId.includes(
              `${process.env.PROJECT_LEAD_TO_CHANGE}`
            )
          ) {
            projectsToChangeLead.push(project.key);
          }
        });
      }
    })
  );
  return projectsToChangeLead;
};

const updateProjectLead = async (project) => {
  const issueBody = {
    leadAccountId: `${process.env.NEW_PROJECT_LEAD}`,
  };
  await Promise.all(
    project.map(async (projectKey) => {
      const response = await fetch(
        `${process.env.URL}/rest/api/3/project/${projectKey}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Basic ${process.env.API_KEY}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(issueBody),
        }
      );
      if (response.status !== 200) {
        console.log(
          "error:",
          `${response.status}: ${response.statusText} at project, ${projectKey}`
        );
        return;
      }
      count += 1;
      console.log(
        `\n${new Date().toGMTString()} - The project lead in project, ${projectKey} has been changed to the new project lead`
      );
    })
  );
  return true;
};

const script = async () => {
  const start = Date.now();
  const projectsToChangeLead = await findProjectsToChangeLead();
  if (projectsToChangeLead.length !== 0) {
    const done = await updateProjectLead(projectsToChangeLead);
    if (done) {
      const end = Date.now();
      const totalTime = end - start;
      console.log(
        `\n${new Date().toGMTString()} - ✅ ${count} projects have been updated with the new project lead in ${
          totalTime / 1000
        } seconds. \n\n\n→ Please check the debug.log file for any errors that might have occurred.\n`
      );
    }
  } else {
    console.log(
      `${new Date().toGMTString()} - There are no projects with the project lead that needs to be changed. No action was taken.`
    );
  }
};

script();

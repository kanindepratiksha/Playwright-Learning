const environments = {
    dev: {
        sauceDemoUrl: "https://www.saucedemo.com/",
        framesUrl: "https://demoqa.com/frames",
        alertsUrl: "https://demoqa.com/alerts",
        browserWindowsUrl: "https://demoqa.com/browser-windows",
        jsonPlaceholderBaseUrl: "https://jsonplaceholder.typicode.com/",
        restfulBookerBaseUrl: "https://restful-booker.herokuapp.com",
        username: "admin",
        password: "password123"
    },
    qa: {
        sauceDemoUrl: "https://www.saucedemo.com/",
        framesUrl: "https://demoqa.com/frames",
        alertsUrl: "https://demoqa.com/alerts",
        browserWindowsUrl: "https://demoqa.com/browser-windows",
        jsonPlaceholderBaseUrl: "https://jsonplaceholder.typicode.com/",
        restfulBookerBaseUrl: "https://restful-booker.herokuapp.com",
        username: "admin",
        password: "password123"
    },
    uat: {
        sauceDemoUrl: "https://www.saucedemo.com/",
        framesUrl: "https://demoqa.com/frames",
        alertsUrl: "https://demoqa.com/alerts",
        browserWindowsUrl: "https://demoqa.com/browser-windows",
        jsonPlaceholderBaseUrl: "https://jsonplaceholder.typicode.com/",
        restfulBookerBaseUrl: "https://restful-booker.herokuapp.com",
        username: "admin",
        password: "password123"
    },
    prod: {
        sauceDemoUrl: "https://www.saucedemo.com/",
        framesUrl: "https://demoqa.com/frames",
        alertsUrl: "https://demoqa.com/alerts",
        browserWindowsUrl: "https://demoqa.com/browser-windows",
        jsonPlaceholderBaseUrl: "https://jsonplaceholder.typicode.com/",
        restfulBookerBaseUrl: "https://restful-booker.herokuapp.com",
        username: "admin",
        password: "password123"
    }
};
const currentEnv =
    (process.env.TEST_ENV || "qa").toLowerCase() as keyof typeof environments;
if (!environments[currentEnv]) {
    throw new Error(
        `Invalid TEST_ENV value: ${process.env.TEST_ENV}. ` +
        `Supported environments: ${Object.keys(environments).join(", ")}`
    );
}
console.log("========================================");
console.log(`Running Environment : ${currentEnv.toUpperCase()}`);
console.log(
    `Base URL : ${environments[currentEnv].restfulBookerBaseUrl}`
);
console.log("========================================");
export const config = environments[currentEnv];
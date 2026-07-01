async function getMessage(): Promise<string> {

    return "Welcome to Playwright";

}

async function displayMessage() {

    const message = await getMessage();

    console.log(message);

}

displayMessage();
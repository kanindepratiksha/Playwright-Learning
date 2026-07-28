export const authSchema = {
    type: "object",
    properties: {
        token: {
            type: "string"
        }
    },
    required: [
        "token"
    ]
};
import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";

// AJV  initialisieren
const ajv = new Ajv({ allErrors: true });

addFormats(ajv);
addErrors(ajv);

ajv.addKeyword({
  keyword: "isOldEnough",
  type: "string",
  validate: function isOldEnoughValidator(schema, data) {
    const birthDate = new Date(data);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDif = today.getMonth() - birthDate.getMonth();
    if (
      monthDif < 0 ||
      (monthDif === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1 >= schema;
    }
    return age >= schema;
  },
  errors: false,
});

const userSchema = {
  type: "object",
  properties: {
    username: {
      type: "string",
      minLength: 4,
      errorMessage: "Please enter a username!",
    },
    email: {
      type: "string",
      format: "email",
      errorMessage: "Please enter a valid Email-address!",
    },
    password: {
      type: "string",
      minLength: 8,
      // maxLength: 50,
      pattern: "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
      errorMessage: {
        minLength: "Your password requires at least 8 characters!",
        // maxLength: "Your password is too long, our limit is 50 characters!",
        pattern:
          "Your password needs at least one numerical digit, a special symbol and an upper- and lowercase letter!",
      },
    },
    birthdate: {
      type: "string",
      format: "date",
      isOldEnough: 14,
      errorMessage: {
        format: "Please enter a valid birthdate in YYYY-MM-DD format!",
        isOldEnough: "You need to be at least 14 years old to join!",
      },
    },
  },
  required: ["username", "email", "password", "birthdate"],
  additionalProperties: false,
  errorMessage: {
    required: {
      name: "Please enter a username!",
      email: "Please enter an Email-address!",
      password: "Please enter a password!",
    },
  },
};

const validateUser = ajv.compile(userSchema);

export default validateUser;

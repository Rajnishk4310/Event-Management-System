// Validation utility for common form fields

export const validateName = (name) => {
    if (!name || name.trim() === "") {
      return "Name is required";
    }
    if (name.length < 2) {
      return "Name must be at least 2 characters long";
    }
    return null; // No errors
  };
  
  export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.trim() === "") {
      return "Email is required";
    }
    if (!emailRegex.test(email)) {
      return "Invalid email address";
    }
    return null; // No errors
  };
  
  export const validateForm = (fields) => {
    let errors = {};
    
    // Check name
    const nameError = validateName(fields.name);
    if (nameError) {
      errors.name = nameError;
    }
  
    // Check email
    const emailError = validateEmail(fields.email);
    if (emailError) {
      errors.email = emailError;
    }
  
    return errors;
  };
  
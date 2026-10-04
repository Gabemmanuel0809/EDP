function isValidStudentNumber(value) {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  const pattern = /^\d{2}-\d{4}-\d{3}$/;
  return pattern.test(trimmed);
}

function isValidPassword(value) {
  if (typeof value !== "string") return false;
  if (/\s/.test(value)) return false;
  if (value.length < 8) return false;
  if (!/[A-Z]/.test(value)) return false;
  if (!/[0-9]/.test(value)) return false;
  if (!/[@$!]/.test(value)) return false;

  return true;
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const fullNameInput = document.getElementById("fullName");
    const studentNumberInput = document.getElementById("studentNumber");
    const emailInput = document.getElementById("email");
    const mobileNumberInput = document.getElementById("mobileNumber");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const courseSelect = document.getElementById("course");
    const termsCheckbox = document.getElementById("terms");
    const fullNameError = document.getElementById("fullNameError");
    const studentNumberError = document.getElementById("studentNumberError");
    const emailError = document.getElementById("emailError");
    const mobileNumberError = document.getElementById("mobileNumberError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    const courseError = document.getElementById("courseError");
    const termsError = document.getElementById("termsError");
    const passwordFeedback = document.getElementById("passwordFeedback");
    const successMessage = document.getElementById("successMessage");
    const registrationSummary = document.getElementById("registrationSummary");
    const summaryName = document.getElementById("summaryName");
    const summaryStudentNumber = document.getElementById("summaryStudentNumber");
    const summaryEmail = document.getElementById("summaryEmail");
    const summaryMobileNumber = document.getElementById("summaryMobileNumber");
    const summaryCourse = document.getElementById("summaryCourse");
    function setError(inputEl, errorEl, message) {
      if (errorEl) errorEl.textContent = message;
      if (inputEl) inputEl.setAttribute("aria-invalid", "true");
    }

    function clearError(inputEl, errorEl) {
      if (errorEl) errorEl.textContent = "";
      if (inputEl) inputEl.setAttribute("aria-invalid", "false");
    }

    function validateFullName() {
      const trimmed = fullNameInput.value.trim();
      if (trimmed.length < 2) {
        setError(fullNameInput, fullNameError, "Full name must be at least 2 characters long.");
        return false;
      }
      clearError(fullNameInput, fullNameError);
      return true;
    }

    function validateStudentNumber() {
      const trimmed = studentNumberInput.value.trim();
      if (!isValidStudentNumber(trimmed)) {
        setError(
          studentNumberInput, 
          studentNumberError, 
          "Enter a student number in the format 24-1234-123."
        );
        return false;
      }
      clearError(studentNumberInput, studentNumberError);
      return true;
    }

    function validateEmail() {
      const trimmed = emailInput.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(trimmed)) {
        setError(emailInput, emailError, "Enter a valid email address (e.g. user@domain.com).");
        return false;
      }
      clearError(emailInput, emailError);
      return true;
    }

    function validateMobileNumber() {
      const trimmed = mobileNumberInput.value.trim();
      const mobilePattern = /^(09\d{9}|\+639\d{9})$/;
      if (!mobilePattern.test(trimmed)) {
        setError(
          mobileNumberInput, 
          mobileNumberError, 
          "Enter a valid mobile number (e.g. 09123456789 or +639123456789)."
        );
        return false;
      }
      clearError(mobileNumberInput, mobileNumberError);
      return true;
    }

    function validatePassword() {
      const val = passwordInput.value; 
      if (!isValidPassword(val)) {
        setError(
          passwordInput, 
          passwordError, 
          "Password must be at least 8 characters, contain 1 uppercase letter, 1 digit, 1 symbol (@, $, !), and no spaces."
        );
        return false;
      }
      clearError(passwordInput, passwordError);
      return true;
    }

    function validateConfirmPassword() {
      const passVal = passwordInput.value;
      const confirmVal = confirmPasswordInput.value;
      if (!confirmVal || confirmVal !== passVal) {
        setError(confirmPasswordInput, confirmPasswordError, "Passwords do not match.");
        return false;
      }
      clearError(confirmPasswordInput, confirmPasswordError);
      return true;
    }

    function validateCourse() {
      const val = courseSelect.value;
      if (val !== "BSIT" && val !== "BSCS") {
        setError(courseSelect, courseError, "Please select a valid course (BSIT or BSCS).");
        return false;
      }
      clearError(courseSelect, courseError);
      return true;
    }

    function validateTerms() {
      if (!termsCheckbox.checked) {
        setError(termsCheckbox, termsError, "You must agree to the terms and conditions.");
        return false;
      }
      clearError(termsCheckbox, termsError);
      return true;
    }

    fullNameInput.addEventListener("blur", validateFullName);

    passwordInput.addEventListener("input", () => {
      const val = passwordInput.value;
      if (isValidPassword(val)) {
        passwordFeedback.textContent = "Password strength requirement met.";
        passwordFeedback.style.color = "#155724";
      } else {
        passwordFeedback.textContent = "Needs at least 8 chars, 1 uppercase, 1 digit, 1 symbol (@, $, !), no spaces.";
        passwordFeedback.style.color = "#6c757d";
      }
      if (passwordError.textContent) {
        validatePassword();
      }
    });

    confirmPasswordInput.addEventListener("input", () => {
      if (confirmPasswordError.textContent) {
        validateConfirmPassword();
      }
    });

    courseSelect.addEventListener("change", validateCourse);
    termsCheckbox.addEventListener("change", validateTerms);

    function resetAllFeedback() {
      const inputs = [
        fullNameInput, studentNumberInput, emailInput, 
        mobileNumberInput, passwordInput, confirmPasswordInput, 
        courseSelect, termsCheckbox
      ];
	  
      const errors = [
        fullNameError, studentNumberError, emailError, 
        mobileNumberError, passwordError, confirmPasswordError, 
        courseError, termsError
      ];

      inputs.forEach(input => input.setAttribute("aria-invalid", "false"));
      errors.forEach(error => error.textContent = "");
      passwordFeedback.textContent = "";
      successMessage.textContent = "";
      successMessage.style.display = "none";
      summaryName.textContent = "";
      summaryStudentNumber.textContent = "";
      summaryEmail.textContent = "";
      summaryMobileNumber.textContent = "";
      summaryCourse.textContent = "";
      registrationSummary.style.display = "none";
    }

    form.addEventListener("reset", () => {
      setTimeout(resetAllFeedback, 0);
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const isNameValid = validateFullName();
      const isStudentNumValid = validateStudentNumber();
      const isEmailValid = validateEmail();
      const isMobileValid = validateMobileNumber();
      const isPassValid = validatePassword();
      const isConfirmPassValid = validateConfirmPassword();
      const isCourseValid = validateCourse();
      const isTermsValid = validateTerms();
      const isFormValid = isNameValid && isStudentNumValid && isEmailValid && isMobileValid && isPassValid && isConfirmPassValid && isCourseValid && isTermsValid;

      if (isFormValid) {
        summaryName.textContent = fullNameInput.value.trim();
        summaryStudentNumber.textContent = studentNumberInput.value.trim();
        summaryEmail.textContent = emailInput.value.trim();
        summaryMobileNumber.textContent = mobileNumberInput.value.trim();
        summaryCourse.textContent = courseSelect.value;
        successMessage.textContent = "Registration details validated successfully!";
        successMessage.style.display = "block";
        registrationSummary.style.display = "block";
        registrationSummary.scrollIntoView({ behavior: "smooth" });
      } else {
        successMessage.textContent = "";
        successMessage.style.display = "none";
        registrationSummary.style.display = "none";
      }
    });
  });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    isValidStudentNumber,
    isValidPassword
  };
}
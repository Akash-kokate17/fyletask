const submit = document
  .querySelector("#submitBtn")
  .addEventListener("click", function (e) {
    e.preventDefault();
 
const ageMap = {
  "Under 40": 40,
  "40 to 60": 50, 
  "Over 60": 70, 
};

    const income = +document.querySelector("#annualIncome").value;
    const extraInc = +document.querySelector("#extraIncome").value;
    const userAge = ageMap[document.querySelector("#age").value];
    const applicableDeduction = +document.querySelector("#deductionsAmt").value;

    // Validate input fields
    if (
      isNaN(income) ||
      isNaN(extraInc) ||
      isNaN(userAge) ||
      isNaN(applicableDeduction)
    ) {
      Swal.fire({
        title: "Fill the filed using number ",
        icon: "question",
      });
      return;
    } else if (!income || !extraInc || !userAge || !applicableDeduction) {
      Swal.fire({
        title: "All filed are required",
        icon: "question",
      });
      return;
    }

    // Calculate total income after deductions
    const totalIncome = income + extraInc - applicableDeduction;

    // Calculate tax based on age and income
    let taxAmount = 0;
    if (totalIncome > 800000) {
      switch (true) {
        case userAge < 40:
          taxAmount = 0.3 * (totalIncome - 800000);
          break;
        case userAge >= 40 && userAge < 60:
          taxAmount = 0.4 * (totalIncome - 800000);
          break;
        case userAge >= 60:
          taxAmount = 0.1 * (totalIncome - 800000);
          break;
      }
    }

    // Display tax amount or no tax message
    if (taxAmount > 0) {
      Swal.fire({
        title: `Tax Amount: ${taxAmount.toFixed(2)} Lakhs   `,
        showClass: {
          popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `,
        },
        hideClass: {
          popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `,
        },
      });
    } else {
      Swal.fire({
        title: "No tax applicable.",
        showClass: {
          popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `,
        },
        hideClass: {
          popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `,
        },
      });
    }
  });

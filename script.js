document.addEventListener("DOMContentLoaded", () => {
  const approved = JSON.parse(localStorage.getItem("approvedCourses") || "[]");
  const courses = document.querySelectorAll(".course");
  const resetButton = document.getElementById("reset-button");
  const progressText = document.getElementById("progress-count");

  function updateLocks() {
    courses.forEach(course => {
      const prereqs = course.dataset.prereq?.split(",") || [];
      const isLocked = prereqs.length > 0 && !prereqs.every(p => approved.includes(p));
      course.classList.toggle("locked", isLocked);
    });
  }

  function updateProgress() {
    const total = courses.length;
    const completed = approved.length;
    progressText.textContent = `Ramos aprobados: ${completed} de ${total}`;
  }

  courses.forEach(course => {
    const code = course.dataset.code;

    if (approved.includes(code)) {
      course.classList.add("approved");
    }

    course.addEventListener("click", () => {
      if (course.classList.contains("locked")) return;

      course.classList.toggle("approved");

      const isApproved = course.classList.contains("approved");
      const index = approved.indexOf(code);

      if (isApproved && index === -1) {
        approved.push(code);
      } else if (!isApproved && index !== -1) {
        approved.splice(index, 1);
      }

      localStorage.setItem("approvedCourses", JSON.stringify(approved));
      updateLocks();
      updateProgress();
    });
  });

  resetButton.addEventListener("click", () => {
    localStorage.removeItem("approvedCourses");
    location.reload();
  });

  updateLocks();
  updateProgress();
});


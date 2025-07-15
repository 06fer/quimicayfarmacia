document.addEventListener("DOMContentLoaded", () => {
  const approved = JSON.parse(localStorage.getItem("approvedCourses") || "[]");
  const courses = document.querySelectorAll(".course");

  function updateLocks() {
    courses.forEach(course => {
      const prereqs = course.dataset.prereq?.split(",") || [];
      const isLocked = prereqs.length > 0 && !prereqs.every(p => approved.includes(p));
      course.classList.toggle("locked", isLocked);
    });
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
    });
  });

  updateLocks();
});


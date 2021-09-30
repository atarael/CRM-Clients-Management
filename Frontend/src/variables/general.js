 
var tasks = [
  'Sign contract for "What are conference organizers afraid of?"',
  "Lines From Great Russian Literature? Or E-mails From My Boss?",
  "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
  "Create 4 Invisible User Experiences you Never Knew About"
];

const updateTask = (task, index) => {
   
  tasks[index] = task;
}
module.exports = {
  tasks,updateTask
};

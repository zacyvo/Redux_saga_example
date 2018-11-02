export const formatDate = (date) =>{
  let day = new Date(date)
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  return monthNames[day.getMonth()]+" "+day.getDate()+"th"
} 
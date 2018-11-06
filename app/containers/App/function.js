export const formatDate = (date,showYear=false) =>{
  let day = new Date(date)
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  let year = showYear?day.getFullYear():""
  return monthNames[day.getMonth()]+" "+day.getDate()+"th " + year
} 
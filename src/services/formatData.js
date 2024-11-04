export const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", options);
    
    let hour = date.getHours();
    const minutes = date.getMinutes();
    const period = hour >= 12 ? "PM" : "AM";
    
    // Handle 12-hour format
    hour = hour % 12 || 12;  
    
    const formattedTime = `${hour}:${minutes.toString().padStart(2, "0")} ${period}`;
    
    return `${formattedDate} | ${formattedTime}`;
};

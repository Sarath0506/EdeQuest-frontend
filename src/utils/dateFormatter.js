export const formatterDate = (date)=>{
    return new Date(date).toLocaleDateString("en-US",{
        month:"long",
        day:"numeric",
        year:"numeric"
    })
}
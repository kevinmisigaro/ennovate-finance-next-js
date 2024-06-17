export const getInitials = (name?: string): string => {

    if(!name){
      return ""
    }

    if (name == "") {
      return "";
    }
    return name!
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };
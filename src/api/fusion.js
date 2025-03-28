import axiosSecure from ".";

export const getBook = async (id) => {
  const { data } = await axiosSecure(`/book/${id}`);
  return data;
};

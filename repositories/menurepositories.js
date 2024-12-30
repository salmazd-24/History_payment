import pb from "../services/pocketbaseservice";

export const fetchMenuItems = async () => {
  try {
    const records = await pb.collection("foods").getFullList();
    return records;
  } catch (err) {
    console.log("Error fetching menu items", err);
    throw err;
  }
};

export const fetchOrders = async () => {
  if (!pb.authStore.isValid) {
    throw new Error("Pengguna tidak terautentikasi");
  }

  try {
    const records = await pb.collection("order").getFullList(50, {
      sort: "-created", // Urutkan berdasarkan waktu dibuat
    });
    return records;
  } catch (error) {
    throw new Error(error.message || "Gagal mengambil data pesanan");
  }
};
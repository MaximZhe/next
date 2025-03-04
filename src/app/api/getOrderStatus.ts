"use server";

export async function getOrderStatus({ orderId }: { orderId: string | string[] | undefined }) {
  const url = process.env.NEXT_PUBLIC_APY_URL
  const data = {
    OrderId: orderId,
    Lang: "RUS",
  };
  try {
    const response = await fetch(
      `${url}/api/v1/alphabank/status`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-store",
      }
    );
    return response.json();
  } catch (error) {
    return error;
  }
}
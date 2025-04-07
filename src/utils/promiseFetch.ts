// export function promiseFetch<T>(input: RequestInfo | URL, init?: RequestInit) {
//   const data = fetch(input, init)
//     .then((res) => res.json())
//     .then((data: T) => data)
//     .catch(() => {
//       throw new Response(JSON.stringify({ message: "Could not fetch!" }), {
//         status: 500,
//         headers: { "Content-Type": "application/json" }
//       });
//     });
//   return data;
// }

export function promiseFetch<T>(input: RequestInfo | URL, init?: RequestInit, delay = 1000) {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      fetch(input, init)
        .then((res) => res.json())
        .then((data: T) => resolve(data))
        .catch(() => {
          reject(
            new Response(JSON.stringify({ message: "Could not fetch!" }), {
              status: 500,
              headers: { "Content-Type": "application/json" }
            })
          );
        });
    }, delay);
  });
}

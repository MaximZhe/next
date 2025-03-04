'use server'
export async function getServerSideProps() {
 
  const url = process.env.NEXT_PUBLIC_APY_URL
    // Здесь можно выполнить запрос на сервер для получения данных
    const dat = {
        Page:0,
        Count:15000,
        Lang:'RUS'
    }
    try{
      const res = await fetch(`${url}/api/v1/cities/get`, {
        method: 'POST',
        body: JSON.stringify(dat),
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        
      });
      return res.json()
    }
    catch (error) {
      return error
    }   
}
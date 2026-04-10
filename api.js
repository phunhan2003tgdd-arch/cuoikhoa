const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2IwYTA5M2YyMDliOTAwM2EzYmQxYTIzMTIwMWU4MiIsIm5iZiI6MTc2ODExODY5NC4zMDcwMDAyLCJzdWIiOiI2OTYzNTlhNjhjOTZiNGFkYzg1OTZhMGQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.d3ZV_EEyFSb3XblZLUlCP7QP5IirS566vaOTZwHqFKI";

fetch("https://api.themoviedb.org/3//discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json"
  }
})
.then(res => res.json())
.then(data => {
  console.log(data.results);
})
.catch(err => console.log(err));
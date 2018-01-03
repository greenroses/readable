const api = process.env.REACT_APP_READABLE_API_URL || 'http://localhost:3001'
const header = { headers: {'Authorization': 'whatever-you-want'}}

export function getAllposts() {
  return fetch(`${api}/posts`, header).then(res => res.json()).then(function(data){console.log(data);});
}

export function getCategories() {
  return fetch(`${api}/categories`, header).then(res => res.json()).then(data => data.categories)
}

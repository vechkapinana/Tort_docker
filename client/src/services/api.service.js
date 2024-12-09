
export class ApiService {
	#apiPath = 'http://localhost:5000/api' //приватное поле


    //fech js отправка запроса
	#makeRequest(url, options) {
		return fetch(this.#apiPath + url, options).then(res => res.json())
		// return fetch(this.#apiPath + url, {
		// 	...options,
		// 	credentials: 'include'
		// }).then(res => res.json())// fetch js отправка запроса
	}

	get(url) {
		return this.#makeRequest(url, { method: 'GET' })
	}

	getAll(url, ID_Category, options) {
		return fetch(this.#apiPath + url, ID_Category, { method: 'GET' }).then(res => res.json())
	}

	getFile(url){
		return fetch(this.#apiPath + url,{ 
		  method: 'GET' 
		}).then(response => {
		  if (response.ok) {
			return response.blob();
		  } else {
			throw new Error('Error getting file: ' + response.statusText);
		  }
		});
	  }

	delete(url) {
		return this.#makeRequest(url, { method: 'DELETE' })
	}

	post(url, data) { //выступает за криейт и апдейт
		return this.#makeRequest(url, {
			headers: {
				'Content-Type': 'application/json'  //то что отсылаем именно json
			},
			body: JSON.stringify(data),
			method: 'POST'
		})
	}

	postformData(url, formData) {
		return this.#makeRequest(url, {
		  body: formData,
		  method: 'POST'
		});
	}
}


// import {$authHost, $host} from "../http/index";
// export class ApiService {

// createCategory = async (url, category) => {
//     const {data} = await $authHost.post(url, category)
//     return data
// }

// fetchCategories = async (url) => {
//     const {data} = await $host.get(url)
//     return data
// }

// createProduct = async (url, product) => {
//     const {data} = await $authHost.post(url, product)
//     return data
// }

// fetchProducts = async (url) => {
//     const {data} = await $host.get(url)
//     return data
// }

// fetchOneProduct = async (url) => {
//     const {data} = await $host.get(url)
//     return data
// }

// fetchOneCategory = async (url) => {
//     const {data} = await $host.get(url)
//     return data
// }

// fetchDelete= async (url) => {
//     const {data} = await $host.delete(url)
//     return data
// }
// }
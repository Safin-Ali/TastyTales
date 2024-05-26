class HttpsFetch {
	private base_url:string
	constructor(baseUrl:string) {
		this.base_url = baseUrl;
	}

	public async get (path:string,option?:RequestInit):Promise<Response> {
		const res = (await fetch (`${this.base_url}${path}`,{
			...option,
			method:'GET'
		}))
		return res;
	}
	public async patch (path:string,option?:RequestInit):Promise<Response> {
		const res = (await fetch (`${this.base_url}${path}`,{
			...option,
			method:'PATCH',
		}))
		return res;
	}
	public async post (path:string,option?:RequestInit):Promise<Response> {
		const res = (await fetch (`${this.base_url}${path}`,{
			...option,
			method:'POST',
		}))
		return res;
	}
}

export const endpointApi = new HttpsFetch('http://localhost:5000/api');
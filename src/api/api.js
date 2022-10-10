export {Api}

class Api{
    static token; //variable estatica para almacenar el token

    static get baseUrl(){
        return 'http://localhost:8080/api'
    }
    //funcion auxiliar para cuando tengo que pasar parametros a un url
    static addParams(names,values){
        return '?'+(names.map((name,index)=>{`${name}=${values[index]}&`}).reduce((prev,curr)=>prev+curr)).slice(0,-1)
    }
    static get timeout(){
        return 60*1000
    }
    static async fetch(url, secure ,init={},controller){
        //si necesita que este autenticado
        if(secure && Api.token){
            //tengo que mandarlo como un header
            if(!init.headers){ //si no pasa los headers (porque no los necesita)
                init.headers = {}
            }
            init.headers['Authorization'] = `bearer ${Api.token}`
        }
        controller = controller || new AbortController()
        init.signal = controller.signal
        //cuando pase el timeout, se hace controller.abort()
        //como lo relacionamos con el init,entonces va a abortar el fetch
        const timer = setTimeout(() => controller.abort(), Api.timeout)
        try {
            //await hace que ese suspenda hasta que se resuelva la promesa
            const response = await fetch(url, init)
            //no usar response.json() porque a veces la api devuelve un ''
            // const data = await response.json() //espero a que lo termine de paresear
            const data = await response.text() //por si devuelve ''
            //si devuelve '', result tiene un objeto vacio
            const result = data ? JSON.parse(data) : {}
            //si tiene la propiedad code, entocnes dio error
            //si code no esta definido, devuelve undefined que es como false
            if (result.code) {
                throw result; //tiro un error
            }
            return result
        }catch (error){
            if(error.code){
                throw error
            }
            if(error.name === 'AbortError'){
                throw{
                    "code":98,
                    "description":error.message.toLowerCase()
                }
            }
            if(error.name === 'TypeError'){
                throw{
                    "code":99,
                    "description":error.message.toLowerCase()
                }
            }
        }finally {
            clearTimeout(timer)//con esto, ya el timer no corre mas
        }

    }

    static async get(url,secure,controller){
        //si no paso init, es como hacer un get
        return await Api.fetch(url,secure,{},controller)
    }
    static async post(url,secure, data,controller){
        return await Api.fetch(url,secure,{
            method:'POST',
            headers:{
                "Content-Type":"application/json; charset=utf-8"
            },
            body: JSON.stringify(data) //para que no llame al toString de un objeto
        },controller)
    }
    static async put(url,secure, data,controller){
        return await Api.fetch(url,secure,{
            method:'PUT',
            headers:{
                "Content-Type":"application/json; charset=utf-8"
            },
            body: JSON.stringify(data) //para que no llame al toString de un objeto
        },controller)
    }
    static async delete(url,secure,controller){
        return await Api.fetch(url,secure,{
            method:'DELETE'
        },controller)
    }
}
export default async function ({route,redirect,app,next}){
    console.log('inmi')
    const gatePass = ["/login","/register","/recovery","/verification"]
    const currentPath = route.path;
    console.log('currentPath',currentPath)
    if(gatePass.includes(currentPath)){
        try{
            await app.$ory.toSession();
            redirect('/')
        }
        catch(err){
            console.log('no change')
        }
    }
    else
    {
        try{
            const checkAuth = await app.$ory.toSession();
            console.log('middleware checkAuth',checkAuth)
            if(gatePass.includes(currentPath)){
                redirect('/')
            }
        }
        catch(err){
            console.log(err)
            redirect('/login')
        }
    }
  }
  
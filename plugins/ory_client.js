import { FrontendApi, Configuration } from "@ory/client"

export default ({},inject) =>{

      const ory = new FrontendApi(
        new Configuration({
          basePath:"http://localhost:4433",
          baseOptions: {
            // Ensures we send cookies in the CORS requests.
            withCredentials: true,
          },
        }),
      )

    inject('ory',ory)
}
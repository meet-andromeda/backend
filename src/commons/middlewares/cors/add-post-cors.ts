import cors from '@middy/http-cors';

/**
 * Add POST CORS headers to the response
 * 
 * @returns middy.Middleware.Obj
 */
function addPostCors(): ReturnType<typeof cors> {
  return cors({
    methods: 'POST',
  });
}

export default addPostCors;

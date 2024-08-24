import cors from '@middy/http-cors';

function addGetCors(): ReturnType<typeof cors> {
  return cors({
    methods: 'GET',
  });
}

export default addGetCors;

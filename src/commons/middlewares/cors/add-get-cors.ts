import cors from '@middy/http-cors';

function addGetCors(): ReturnType<typeof cors> {
  console.log('addGetCors');
  return cors({
    methods: 'GET',
  });
}

export default addGetCors;

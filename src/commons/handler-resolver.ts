export const handlerPath = (context: string)
: string => `${context.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}`;

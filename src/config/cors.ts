import "dotenv/config"
import cors from 'cors';

export const cors_config = cors({
  origin:process.env.FRONT_ORIGIN,
  credentials:true,
  methods:["POST","GET"],
  allowedHeaders:['Content-Type','Authorization']
})
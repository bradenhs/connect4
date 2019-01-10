import Koa from "koa";
import cors from "@koa/cors";
import ip from "ip";
import bodyParser from "koa-bodyparser";
import { getRandomLegalMove } from "../shared/getRandomLegalMove";

const app = new Koa();

app.use(cors());
app.use(bodyParser());

app.use(async ctx => {
  const { moves } = ctx.request.body as { moves: number[] };
  ctx.response.body = { nextMove: getRandomLegalMove(moves) };
});

app.listen(4444, () => {
  console.log(
    `Computer started at http://localhost:4444 (http://${ip.address()}:4444)`
  );
});

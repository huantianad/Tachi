import { Router } from "express";
import authRouter from "./auth/router";
import importRouter from "./import/router";
import statusRouter from "./status/router";

const router: Router = Router({ mergeParams: true });

router.use("/auth", authRouter);
router.use("/status", statusRouter);
router.use("/import", importRouter);

router.all("*", (req, res) =>
    res.status(404).json({
        success: false,
        description: "Endpoint Not Found.",
    })
);

export default router;

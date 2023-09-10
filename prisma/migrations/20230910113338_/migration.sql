-- CreateTable
CREATE TABLE "TaskMemo" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "TaskMemo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TaskMemo" ADD CONSTRAINT "TaskMemo_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

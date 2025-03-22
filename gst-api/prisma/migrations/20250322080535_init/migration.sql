-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "sourceState" TEXT NOT NULL,
    "sourceCountry" TEXT NOT NULL,
    "destinationState" TEXT NOT NULL,
    "destinationCountry" TEXT NOT NULL,
    "gstType" TEXT NOT NULL,
    "gstAmount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

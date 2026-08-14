import { test } from "../../fixtures/authFixture";
import { InventoryPage } from "../../pages/InventoryPage";
import { AllureHelper } from "../../utils/AllureHelper";
test(
    "Verify Successful Login",
    async ({ authenticatedPage }) => {
        await AllureHelper.metadata({
            feature: "Authentication Fixture",
            story: "Verify Successful Login",
            severity: "critical"
        });
        const inventoryPage = new InventoryPage(
            authenticatedPage
        );
        await AllureHelper.step(
            "Verify Products Page",
            async () => {
                await inventoryPage.verifyProductsPage();
            }
        );
    }
);
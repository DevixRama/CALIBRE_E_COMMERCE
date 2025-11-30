import { createUserTable } from '../models/userTable.js'
import { createProductsTable } from '../models/productTable.js'
import { createProductReviewsTable } from '../models/productReviewsTable.js'
import { createOrdersTable } from '../models/ordersTable.js'
import { createOrderItemTable } from '../models/orderItemsTable.js'
import { createShippingInfoTable } from '../models/shippinginfoTable.js'
import { createPaymentsTable } from '../models/paymentsTable.js'


export const createTable = async () => {

    try {
        await createUserTable()
        await createProductsTable()
        await createProductReviewsTable()
        await createOrdersTable()
        await createOrderItemTable()
        await createShippingInfoTable()
        await createPaymentsTable()

        console.log("All tables created successfully!");

    } catch (error) {
        console.error("Table creation fail", error);
    }

}
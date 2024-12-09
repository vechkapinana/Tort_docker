// // const {Address}= require('../models/models')
// const { PDFDocument, rgb } = require('pdf-lib');
// // const bodyParser = require('body-parser');
// const fs = require('fs');
// const path = require('path');
// const fontkit = require('@pdf-lib/fontkit'); // добавлен импорт fontkit
// const db = require('../bd')
// class PdfController {
//     async create(req, res) {
//         const { ID_Client } = req.body;

//         try {
//             const result = await db.query(
//               `SELECT orders."ID_Order", TO_CHAR(orders."DataD", 'DD-MM-YYYY') AS "DataD", orders."Cost", orders."Coment", statuses."NameSt"
//               FROM public.orders 
//               JOIN public.statuses ON orders."ID_Status"=statuses."ID_Status"
//               WHERE orders."ID_Client" = ${ID_Client}`,
//               [ID_Client]
//             );

//             const orders = result.rows;

//             // PDFDocument.registerFontkit(fontkit); // регистрация fontkit

//             const pdfDoc = await PDFDocument.create();
//             const fontBytes = fs.readFileSync(path.resolve(__dirname, 'C:/tort/client/src/http/Roboto-Regular.ttf'));
//             const customFont = await pdfDoc.embedFont(fontBytes);
//             const page = pdfDoc.addPage([600, 400]);
//             const { width, height } = page.getSize();
//             const fontSize = 12;

//             // const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

//             page.drawText('Отчет по заказам клиента', {
//                 x: 50,
//                 y: height - 50,
//                 size: 20,
//                 font: helveticaFont,
//                 color: rgb(0, 0, 0),
//             });
//             let yPosition = height - 80;

//             orders.forEach((order, index) => {
//                 page.drawText(`Заказ ID: ${order.ID_Order}`, { x: 50, y: yPosition, size: fontSize });
//                 page.drawText(`Дата: ${order.DataD}`, { x: 50, y: yPosition - 15, size: fontSize });
//                 page.drawText(`Стоимость: ${order.Cost}`, { x: 50, y: yPosition - 30, size: fontSize });
//                 page.drawText(`Комментарий: ${order.Coment}`, { x: 50, y: yPosition - 45, size: fontSize });
//                 page.drawText(`Статус: ${order.NameSt}`, { x: 50, y: yPosition - 60, size: fontSize });
//                 yPosition -= 80;
//               });

//               const pdfBytes = await pdfDoc.save();

//               res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
//               res.setHeader('Content-Type', 'application/pdf');
//               res.send(Buffer.from(pdfBytes));
//             } catch (error) {
//               console.error('Error generating PDF:', error);
//               res.status(500).send('Error generating PDF');
//             }
        
//     }

    
// }

// module.exports = new PdfController()


// const { PDFDocument } = require('pdf-lib');
// const db = require('../bd');

// async function generatePDF(req, res) {
//     const { ID_Client } = req.body;

//     try {
//         const result = await db.query(
//             `SELECT orders."ID_Order", TO_CHAR(orders."DataD", 'DD-MM-YYYY') AS "DataD", orders."Cost", orders."Coment", statuses."NameSt"
//             FROM public.orders 
//             JOIN public.statuses ON orders."ID_Status"=statuses."ID_Status"
//             WHERE orders."ID_Client" = ${ID_Client}`,
//             [ID_Client]
//         );

//         const orders = result.rows;

//         const pdfDoc = await PDFDocument.create();
//         const page = pdfDoc.addPage();

//         // Add content to the PDF
//         page.drawText('Order Report', { x: 50, y: 700 });
//         // Add more text or data from the database...

//         const pdfBytes = await pdfDoc.save();

//         res.setHeader('Content-Disposition', 'attachment; filename=newPdf.pdf');
//         res.setHeader('Content-Type', 'application/pdf');
//         res.send(pdfBytes);

//         console.log(pdfDoc)
//     } catch (error) {
//         console.error('Error generating PDF:', error);
//         // res.status(500).send('Error generating PDF');
//         res.status(500).json({ error: 'Error generating PDF' });
//     }


//     // function get(req, res) {
//     //     res.sendFile(`${__dirname}/newPdf.pdf`)
//     // }
// }

// module.exports = { generatePDF };



const {Product_Order}= require('../models/models')
const ApiError = require('../error/ApiError')
const db = require('../bd')
const pdf = require('html-pdf');
const Templete = require('../documents/order');
const path = require('path')
class PdfController {

    async get(req, res) {
        const ID_Client = req.params.ID_Client
        const order = await db.query(`SELECT orders."ID_Order", TO_CHAR(orders."DataD", 'DD-MM-YYYY') AS "DataD", orders."Cost", orders."Coment", statuses."NameSt"
                    FROM public.orders 
                    JOIN public.statuses ON orders."ID_Status"=statuses."ID_Status"
                    WHERE orders."ID_Client" = ${ID_Client}`)
        return res.json(order)
    }

    async create(req, res){
		console.log('Create',req.body);
		pdf.create(Templete(req.body), {}).toFile(path.resolve(__dirname,'..','static','result.pdf'), (err) => {
			if(err) {
				res.send(Promise.reject());
			}
			res.send(Promise.resolve());
		});
	};

    async getAll(req, res) {
		console.log('getOne')
		console.log(path.resolve(__dirname,'..','static','result.pdf'));
		res.sendFile(path.resolve(__dirname,'..','static','result.pdf'));

	}

    
}

module.exports = new PdfController()


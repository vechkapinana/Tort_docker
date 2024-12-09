module.exports = (information) => {
    console.log('check',information);
    const ID_Client = information.ID_Client
    const ID_Order0 = information.all[0].ID_Order
    const ID_Order1   = information.all[1].ID_Order
    const ID_Order2 = information.all[2].ID_Order
    const Cost0 = information.all[0].Cost
    const Cost1   = information.all[1].Cost
    const Cost2 = information.all[2].Cost
    const DataD0 = information.all[0].DataD
    const DataD1   = information.all[1].DataD
    const DataD2 = information.all[2].DataD
    const NameSt0 = information.all[0].NameSt
    const NameSt1   = information.all[1].NameSt
    const NameSt2 = information.all[2].NameSt
    // const date = information.date
    // const all = information.all.sum
return `
<!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>Отчёт</title>
          <style>
             .invoice-box {
             max-width: 800px;
             margin: auto;
             padding: 30px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             font-size: 16px;
             line-height: 24px;
             font-family: 'Helvetica Neue', 'Helvetica';
             color: #555;
             }
             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             .invoice-box table {
             width: 100%;
             line-height: inherit;
             text-align: left;
             }
             .invoice-box table td {
             padding: 5px;
             vertical-align: top;
             }
             .invoice-box table tr.top table td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.top table td.title {
             font-size: 45px;
             line-height: 45px;
             color: #333;
             }
             .invoice-box table tr.information table td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.heading td {
             background: #eee;
             border-bottom: 1px solid #ddd;
             font-weight: bold;
             }
             .invoice-box table tr.details td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.item td {
             border-bottom: 1px solid #eee;
             }
             .invoice-box table tr.item.last td {
             border-bottom: none;
             }
             .invoice-box table tr.total td:nth-child(2) {
             border-top: 2px solid #eee;
             font-weight: bold;
             }
             @media only screen and (max-width: 600px) {
             .invoice-box table tr.top table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             .invoice-box table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
            }
          </style>
       </head>
       <body>
       <h1 class="justify-center">Отчёт о заказах клиента</h1>
       <div class="invoice-box">
    <table class="invoice-box table">
        <thead>
            <tr>
                <th>ID Заказа</th>
                <th>Дата доставки</th>
                <th>Сумма</th>
                <th>Статус</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>${ID_Order0}</td>
                <td>${DataD0}</td>
                <td>${Cost0}</td>
                <td>${NameSt0}</td>
            </tr>
            <tr>
                <td>${ID_Order1}</td>
                <td>${DataD1}</td>
                <td>${Cost1}</td>
                <td>${NameSt1}</td>
            </tr>
            <tr>
                <td>${ID_Order2}</td>
                <td>${DataD2}</td>
                <td>${Cost2}</td>
                <td>${NameSt2}</td>
            </tr>
        </tbody>
    </table>
    </div>
       </body>
    </html>
    `;
};
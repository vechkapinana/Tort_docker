// // ReportGenerator.js
// import React, { useState } from 'react';
// import { ApiService } from '../services/api.service'

// const apiService = new ApiService()

// function ReportGenerator() {
//   const [clientID, setClientID] = useState('');
//   console.log(clientID)

//   const handleGenerateReport = async () => {
//     try {

//     const response = apiService.post('/generate-pdf',  { ID_Client: clientID , responseType: 'blob' }).then(() => {})

//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'report.pdf');
//       document.body.appendChild(link);
//       link.click();
//     } catch (error) {
//       console.error('Error generating report:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Генерация отчета по заказам</h1>
//       <input
//         type="text"
//         value={clientID}
//         onChange={(e) => setClientID(e.target.value)}
//         placeholder="Введите ID клиента"
//       />
//       <button onClick={handleGenerateReport}>Сгенерировать отчет</button>
//     </div>
//   );
// }

// export default ReportGenerator;


// ReportGenerator.js

// import React, { useState } from 'react';
// import { ApiService } from '../services/api.service'
// import { saveAs } from 'file-saver';

// const apiService = new ApiService()

// function ReportGenerator() {
//     const [clientID, setClientID] = useState('');

//     const handleGenerateReport = async () => {
//         try {
//             // const response = await apiService.post('/generate-pdf', { ID_Client: clientID }, { responseType: 'blob' });
//             await apiService.post('/generate-pdf', { ID_Client: clientID }, { responseType: 'blob' })
//             // .then(() => apiService.get('/generate-pdf', { responseType: 'blob' }))
//             .then((res) => {
//                 // console.log(res)
//                 const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
//                 saveAs(pdfBlob, 'newPdf.pdf');
//               })

//             // const blob = new Blob([response.data], { type: 'application/pdf' });
//             // const url = window.URL.createObjectURL(blob);
//             // const url = URL.createObjectURL(response.data);
//             // const link = document.createElement('a');
//             // link.href = url;
//             // link.setAttribute('download', 'order_report.pdf');
//             // document.body.appendChild(link);
//             // link.click();
//             // saveAs(blob, 'order_report.pdf');
//         } catch (error) {
//             console.error('Error generating report:', error);
//         }
//     };



//     return (
//         <div>
//             <h1>Generate Order Report</h1>
//             <input
//                 type="text"
//                 value={clientID}
//                 onChange={(e) => setClientID(e.target.value)}
//                 placeholder="Enter Client ID"
//             />
//             <button onClick={handleGenerateReport}>Generate Report</button>
//         </div>
//     );
// }

// export default ReportGenerator;



import {React } from 'react';
import { ApiService } from '../services/api.service';
import { saveAs } from 'file-saver';
import {Documnet} from './Documnet'


const apiService = new ApiService();
 const Document = () => {

    function getDocument(path){
        console.log(path);
      apiService.getFile(path)
          .then((res) => {
            console.log('res',res);
            const pdfBlob = new Blob([res], { type: 'application/pdf' });
            saveAs(pdfBlob, 'Отчёт.pdf');
          })
    }
    return (
        <div style={{minHeight:'400px'}}>
            <Documnet getDocument={getDocument}/>
        </div>
    );
};


export default Document;
import connection from "./DB/connection.js";
import authRoutes from './modules/auth/auth.controller.js';
// import messageRoutes from './modules/message/message.routes.js'; 
// import userRoutes from './modules/user/user.routes.js';



const bootstrap = (app, express) => {
    app.use(express.json());

    connection();

    app.use('/auth', authRoutes);
    // app.use('/messages', messageRoutes);
    // app.use('/users', userRoutes);

    app.all('*', (req, res) => {
        return res.status(404).json({ message: 'This source is not found.' });
    });

}


export default bootstrap;
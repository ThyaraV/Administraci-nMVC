import Notification from '../models/notificationModel';

// Función para enviar (crear) y guardar una notificación
export const sendNotification = async (userId, message, io) => {
  try {
    const notification = new Notification({
      userId,
      message
    });

    const savedNotification = await notification.save();
    io.to(userId.toString()).emit('notification', savedNotification);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

// Función para obtener las notificaciones de un usuario
export const getNotifications = async (req, res) => {
  try {
    const userId = req.params.userId;
    const notifications = await Notification.find({ userId }).sort({ date: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications' });
  }
};

// Función para marcar una notificación como leída
export const markAsRead = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const notification = await Notification.findById(notificationId);

    if (notification) {
      notification.read = true;
      await notification.save();
      res.json({ message: 'Notification marked as read' });
    } else {
      res.status(404).json({ message: 'Notification not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating notification' });
  }
};

// Exportar las funciones para usarlas en tus rutas
export default {
  sendNotification,
  getNotifications,
  markAsRead
};



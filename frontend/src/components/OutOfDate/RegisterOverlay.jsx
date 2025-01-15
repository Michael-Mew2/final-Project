// import React, { useState } from "react";
// import {
//   Modal,
//   TextInput,
//   PasswordInput,
//   Button,
//   Group,
//   Title,
//   Text,
// } from "@mantine/core";

// const RegisterOverlay = ({ isOpen, onClose, onRegister }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!formData.name || !formData.email || !formData.password) {
//       setError("Alle Felder müssen ausgefüllt werden.");
//       return;
//     }

//     try {
//       onRegister(formData);
//       setError("");
//       onClose();
//     } catch (err) {
//       setError("Registrierung fehlgeschlagen. Versuchen Sie es erneut.");
//     }
//   };

//   return (
//     <Modal
//       opened={isOpen}
//       onClose={onClose}
//       title={<Title order={3}>Registrieren</Title>}
//       centered
//       overlayOpacity={0.6} // Nur diese Prop bleibt
//       zIndex={2000} // Sicherstellen, dass Modal über allem liegt
//     >
//       <form onSubmit={handleSubmit}>
//         <TextInput
//           label="Name"
//           placeholder="Dein Name"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />

//         <TextInput
//           label="E-Mail"
//           placeholder="Deine E-Mail-Adresse"
//           name="email"
//           type="email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           mt="md"
//         />

//         <PasswordInput
//           label="Passwort"
//           placeholder="Dein Passwort"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//           mt="md"
//         />

//         {error && (
//           <Text color="red" size="sm" mt="md">
//             {error}
//           </Text>
//         )}

//         <Group position="apart" mt="xl">
//           <Button variant="default" onClick={onClose}>
//             Abbrechen
//           </Button>
//           <Button type="submit">Registrieren</Button>
//         </Group>
//       </form>
//     </Modal>
//   );
// };

// export default RegisterOverlay;

-- Script SQL para crear las tablas y datos iniciales en Directus
-- Ejecutar después de instalar Directus

-- Crear tabla landing_page_content
INSERT INTO directus_collections (collection, icon, note, display_template, hidden, singleton, translations, archive_field, archive_app_filter, archive_value, unarchive_value, sort_field, accountability, color, item_duplication_fields, sort, group_, collapse, preview_url, versioning) VALUES 
('landing_page_content', 'web', 'Contenido del landing page', NULL, 0, 1, NULL, NULL, 1, NULL, NULL, NULL, 'all', NULL, NULL, NULL, NULL, 'content', 'open', NULL, 0);

-- Crear campos para landing_page_content
INSERT INTO directus_fields (collection, field, special, interface, options, display, display_options, readonly, hidden, sort, width, translations, note, conditions, required, group_, validation, validation_message) VALUES 
('landing_page_content', 'id', NULL, 'input', NULL, NULL, NULL, 1, 1, 1, 'full', NULL, NULL, NULL, 0, NULL, NULL, NULL),
('landing_page_content', 'hero_title', NULL, 'input', '{"trim": true}', NULL, NULL, 0, 0, 2, 'full', NULL, 'Título principal del hero', NULL, 1, 'hero_section', NULL, NULL),
('landing_page_content', 'hero_subtitle', NULL, 'textarea', '{"trim": true}', NULL, NULL, 0, 0, 3, 'full', NULL, 'Subtítulo del hero', NULL, 1, 'hero_section', NULL, NULL),
('landing_page_content', 'hero_phone_button_text', NULL, 'input', '{"trim": true}', NULL, NULL, 0, 0, 4, 'half', NULL, 'Texto del botón de teléfono', NULL, 1, 'hero_section', NULL, NULL),
('landing_page_content', 'hero_quote_button_text', NULL, 'input', '{"trim": true}', NULL, NULL, 0, 0, 5, 'half', NULL, 'Texto del botón de presupuesto', NULL, 1, 'hero_section', NULL, NULL),
('landing_page_content', 'services_title', NULL, 'input', '{"trim": true}', NULL, NULL, 0, 0, 6, 'half', NULL, 'Título de servicios', NULL, 1, 'services_section', NULL, NULL),
('landing_page_content', 'services_subtitle', NULL, 'textarea', '{"trim": true}', NULL, NULL, 0, 0, 7, 'full', NULL, 'Subtítulo de servicios', NULL, 1, 'services_section', NULL, NULL),
('landing_page_content', 'windshield_replacement_title', NULL, 'input', '{"trim": true}', NULL, NULL, 0, 0, 8, 'half', NULL, 'Título del reemplazo', NULL, 1, 'services_section', NULL, NULL),
('landing_page_content', 'windshield_replacement_description', NULL, 'textarea', '{"trim": true}', NULL, NULL, 0, 0, 9, 'full', NULL, 'Descripción del reemplazo', NULL, 1, 'services_section', NULL, NULL),
('landing_page_content', 'mobile_service_title', NULL, 'input', '{"trim": true}', NULL, NULL, 0, 0, 10, 'half', NULL, 'Título del servicio móvil', NULL, 1, 'services_section', NULL, NULL),
('landing_page_content', 'mobile_service_description', NULL, 'textarea', '{"trim": true}', NULL, NULL, 0, 0, 11, 'full', NULL, 'Descripción del servicio móvil', NULL, 1, 'services_section', NULL, NULL);

-- Crear tabla navigation
INSERT INTO directus_collections (collection, icon, note, display_template, hidden, singleton, translations, archive_field, archive_app_filter, archive_value, unarchive_value, sort_field, accountability, color, item_duplication_fields, sort, group_, collapse, preview_url, versioning) VALUES 
('navigation', 'menu', 'Elementos de navegación', NULL, 0, 0, NULL, NULL, 1, NULL, NULL, 'order', 'all', NULL, NULL, NULL, NULL, 'content', 'open', NULL, 0);

-- Crear campos para navigation
INSERT INTO directus_fields (collection, field, special, interface, options, display, display_options, readonly, hidden, sort, width, translations, note, conditions, required, group_, validation, validation_message) VALUES 
('navigation', 'id', NULL, 'input', NULL, NULL, NULL, 1, 1, 1, 'full', NULL, NULL, NULL, 0, NULL, NULL, NULL),
('navigation', 'label', NULL, 'input', '{"trim": true}', NULL, NULL, 0, 0, 2, 'half', NULL, 'Texto del enlace', NULL, 1, NULL, NULL, NULL),
('navigation', 'href', NULL, 'input', '{"trim": true}', NULL, NULL, 0, 0, 3, 'half', NULL, 'URL o anchor', NULL, 1, NULL, NULL, NULL),
('navigation', 'order', NULL, 'input', '{"min": 1}', NULL, NULL, 0, 0, 4, 'half', NULL, 'Orden de aparición', NULL, 1, NULL, NULL, NULL),
('navigation', 'status', NULL, 'select-dropdown', '{"choices": [{"text": "Published", "value": "published"}, {"text": "Draft", "value": "draft"}]}', NULL, NULL, 0, 0, 5, 'half', NULL, 'Estado de publicación', NULL, 1, NULL, NULL, NULL);

-- Crear tabla company_info
INSERT INTO directus_collections (collection, icon, note, display_template, hidden, singleton, translations, archive_field, archive_app_filter, archive_value, unarchive_value, sort_field, accountability, color, item_duplication_fields, sort, group_, collapse, preview_url, versioning) VALUES 
('company_info', 'business', 'Información de la empresa', NULL, 0, 1, NULL, NULL, 1, NULL, NULL, NULL, 'all', NULL, NULL, NULL, NULL, 'content', 'open', NULL, 0);

-- Crear campos para company_info
INSERT INTO directus_fields (collection, field, special, interface, options, display, display_options, readonly, hidden, sort, width, translations, note, conditions, required, group_, validation, validation_message) VALUES 
('company_info', 'id', NULL, 'input', NULL, NULL, NULL, 1, 1, 1, 'full', NULL, NULL, NULL, 0, NULL, NULL, NULL),
('company_info', 'company_name', NULL, 'input', '{"trim": true}', NULL, NULL, 0, 0, 2, 'full', NULL, 'Nombre de la empresa', NULL, 1, NULL, NULL, NULL),
('company_info', 'phone_number', NULL, 'input', '{"trim": true}', NULL, NULL, 0, 0, 3, 'half', NULL, 'Número de teléfono', NULL, 1, NULL, NULL, NULL),
('company_info', 'email', NULL, 'input', '{"trim": true}', NULL, NULL, 0, 0, 4, 'half', NULL, 'Email de contacto', NULL, 0, NULL, NULL, NULL),
('company_info', 'address', NULL, 'textarea', '{"trim": true}', NULL, NULL, 0, 0, 5, 'full', NULL, 'Dirección física', NULL, 1, NULL, NULL, NULL);

-- Insertar datos iniciales
INSERT INTO landing_page_content (id, hero_title, hero_subtitle, hero_phone_button_text, hero_quote_button_text, services_title, services_subtitle, windshield_replacement_title, windshield_replacement_description, mobile_service_title, mobile_service_description) VALUES 
(1, 'Servicio Móvil de Vidrios para Autos en Fort Worth, TX', 'Reemplazamos el parabrisas de tu auto donde estés', 'Llámanos Ahora', 'Solicita Presupuesto', 'Nuestros Servicios', 'Ofrecemos servicios profesionales de reemplazo de vidrios automotrices con la mejor calidad y garantía', 'Reemplazo de Parabrisas', 'Reemplazamos parabrisas dañados con vidrios de la más alta calidad y técnicas profesionales.', 'Servicio Móvil Gratuito', 'Vamos hasta donde estés sin costo adicional. Tu comodidad es nuestra prioridad.');

INSERT INTO navigation (label, href, order, status) VALUES 
('Inicio', '#inicio', 1, 'published'),
('Servicios', '#servicios', 2, 'published'),
('Contacto', '#contacto', 3, 'published');

INSERT INTO company_info (id, company_name, phone_number, address) VALUES 
(1, 'Service Auto Glass LLC', '214-939-0707', '6101 Willard Rd, Fort Worth, TX 76119');

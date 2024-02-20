import React from 'react';
import DOMPurify from 'dompurify';
import { CardText } from 'reactstrap';

const  HtmlToText= ({ htmlContent }) => {
  const sanitizedHtml = DOMPurify.sanitize(htmlContent);

  return (
    <CardText dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
  );
};

export default HtmlToText;
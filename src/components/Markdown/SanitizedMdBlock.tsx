import * as DOMPurify from 'dompurify';
import * as React from 'react';

import { OptionsConsumer } from '../OptionsProvider';
import { StylingMarkdownProps } from './Markdown';
import { StyledMarkdownBlock } from './styled.elements';
import styled from 'styled-components';

const StyledMarkdownSpan = styled(StyledMarkdownBlock)`
  display: inline;
`;

const sanitize = (sanitize, html) => (sanitize ? DOMPurify.sanitize(html) : html);

export function SanitizedMarkdownHTML({
  inline,
  compact,
  ...rest
}: StylingMarkdownProps & { html: string; className?: string; 'data-role'?: string }) {
  const Wrap = inline ? StyledMarkdownSpan : StyledMarkdownBlock;

  return (
    <OptionsConsumer>
      {options => (
        <Wrap
          className={'redoc-markdown ' + (rest.className || '')}
          dangerouslySetInnerHTML={{
            __html: sanitize(options.sanitize, rest.html),
          }}
          data-role={rest['data-role']}
          {...rest}
          $inline={inline}
          $compact={compact}
        />
      )}
    </OptionsConsumer>
  );
}

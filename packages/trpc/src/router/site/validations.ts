import { z } from 'zod';

export const SITE_TEMPLATE_URL_VALIDATION = z
  .string({
    required_error: 'Notion template URL is required',
  })
  .superRefine((val, ctx) => {
    let url: URL;
    try {
      url = new URL(val);
    } catch {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid URL',
        fatal: true,
      });
      return z.NEVER;
    }
    if (!url.hostname.endsWith(`.notion.site`)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid Notion URL, domain should be notion.site',
        fatal: true,
      });
      return z.NEVER;
    }
    const pageId = url.pathname.split('-').pop();
    if (!pageId || !/^[\da-z]+$/.test(pageId)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid Notion URL, page ID is missing or invalid',
        fatal: true,
      });
      return z.NEVER;
    }
  });

export const SITE_NAME_VALIDATION = z
  .string()
  .min(1, 'Name must contain at least 1 character')
  .max(190, 'Name must contain at most 190 characters');

export const SITE_SUBDOMAIN_VALIDATION = z
  .string()
  .min(3, 'Subdomain must contain at least 3 characters')
  .regex(
    /^[\da-z\-]+$/,
    'Subdomain can only contain lowercase letters, numbers and hyphens',
  );

export const SITE_DESCRIPTION_VALIDATION = z
  .string()
  .min(1, 'Description must contain at least 1 character')
  .max(190, 'Description must contain at most 190 characters');

export const CREATE_INPUT_VALIDATION = z.object({
  name: SITE_NAME_VALIDATION,
  subdomain: SITE_SUBDOMAIN_VALIDATION,
  description: SITE_DESCRIPTION_VALIDATION,
  templateUrl: SITE_TEMPLATE_URL_VALIDATION,
});

export const UPDATE_INPUT_VALIDATION = CREATE_INPUT_VALIDATION.extend({
  id: z.string(),
});

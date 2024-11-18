import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { zValidator } from '@hono/zod-validator';
import { eq, inArray } from 'drizzle-orm';
import { Hono } from 'hono';
import { z } from 'zod';

import { db } from '@/db/drizzle';
import { siteStateChanges, insertSiteStateChangesSchema, periods } from '@/db/schema';

const patchSitestatechangeSchema = z.object({
  name: z.string().optional()
});

const app = new Hono()
  .get('/', clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const data = await db.select().from(siteStateChanges);

    return c.json({ data });
  })
  .get(
    '/:id',
    zValidator(
      'param',
      z.object({
        id: z.string()
      })
    ),
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid('param');

      if (!auth?.userId) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const [data] = await db
        .select()
        .from(siteStateChanges)
        .where(eq(siteStateChanges.id, parseInt(id)));

      if (!data) {
        return c.json({ error: 'Not found' }, 404);
      }

      return c.json({ data });
    }
  )
  .post(
    '/',
    clerkMiddleware(),
    zValidator(
      'json',
      insertSiteStateChangesSchema.omit({
        id: true
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid('json');

      if (!auth?.userId) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const [data] = await db.insert(siteStateChanges).values(values).returning();

      return c.json({ data });
    }
  )
  .post(
    '/bulk-create',
    clerkMiddleware(),
    zValidator(
      'json',
      z.array(
        insertSiteStateChangesSchema
          .omit({
            id: true,
            siteId: true,
            timePeriodId: true
          })
          .extend({
            site_name: z.string(),
            time_period_name: z.string()
          })
      )
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid('json');

      if (!auth?.userId) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      // Get all unique names
      const siteNames = Array.from(
        new Set(values.map((v) => v.site_name))
      );
      const timePeriodNames = Array.from(
        new Set(values.map((v) => v.time_period_name))
      );

      // Fetch related entities
      const [siteMap, timePeriodMap] = await Promise.all([
          db.select().from(sites).where(inArray(sites.name, siteNames))
          .then(results => new Map(results.map(r => [r.name, r.id]))),
        db.select().from(periods).where(inArray(periods.name, timePeriodNames))
          .then(results => new Map(results.map(r => [r.name, r.id])))
      ]);

      // Prepare demand data
      const demandData = values.map((value) => {
        const siteId = siteMap.get(value.site_name);
        const timePeriodId = timePeriodMap.get(value.time_period_name);

        if (!siteId || !timePeriodId) {
          throw new Error(
            `Missing reference: ${value.site_name}, ${value.time_period_name}`
          );
        }

        const {
          site_name,
          time_period_name,
          ...demandFields
        } = value;
        return {
          ...demandFields,
          siteId,
          timePeriodId,
          userId: auth.userId
        };
      });

      // Insert demands
      const data = await db.insert(siteStateChanges).values(demandData).returning();

      return c.json({ data });
    }
  )
  .post(
    '/bulk-delete',
    clerkMiddleware(),
    zValidator(
      'json',
      z.object({
        ids: z.array(z.number())
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { ids } = c.req.valid('json');

      if (!auth?.userId) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      try {
        const data = await db
          .delete(siteStateChanges)
          .where(inArray(siteStateChanges.id, ids))
          .returning({ id: siteStateChanges.id });

        return c.json({ data });
      } catch (error) {
        console.error('Bulk delete error:', error);
        return c.json({ error: 'Internal Server Error' }, 500);
      }
    }
  )
  .patch(
    '/:id',
    clerkMiddleware(),
    zValidator(
      'param',
      z.object({
        id: z.string()
      })
    ),
    zValidator('json', patchSitestatechangeSchema),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid('param');
      const values = c.req.valid('json');

      if (!auth?.userId) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const [data] = await db
        .update(siteStateChanges)
        .set(values)
        .where(eq(siteStateChanges.id, parseInt(id)))
        .returning();

      if (!data) {
        return c.json({ error: 'Not found' }, 404);
      }

      return c.json({ data });
    }
  )
  .delete(
    '/:id',
    clerkMiddleware(),
    zValidator(
      'param',
      z.object({
        id: z.string()
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid('param');

      if (!auth?.userId) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const [data] = await db
        .delete(siteStateChanges)
        .where(eq(siteStateChanges.id, parseInt(id)))
        .returning();

      if (!data) {
        return c.json({ error: 'Not found' }, 404);
      }

      return c.json({ data });
    }
  );

export default app;

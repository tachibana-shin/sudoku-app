export const state = () => ({
  planks: []
});

/* **
   * @params
   is_challenges: boolean
   created: Date.now(),
   completed: Date.now()
   level: level,
   time: timeout,
   limit_wrong: boolean

   if limit_wrong:
      is_success: boolean

   point: point
   hint
** */

export const mutations = {
  push(
    { planks },
     { is_challenges, created, completed, level, time, limit_wrong, length_wrong, is_success, point, hint }
  ) {
    planks.push({
      is_challenges,
      created,
      completed,
      level,
      time,
      limit_wrong,
      length_wrong,
      is_success,
      point,
      hint
    });
  }
};

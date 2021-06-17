class DBRouter:

    def db_for_read(self, model, **hints):

        if model._meta.app_label == 'staffing': 
            return 'staffing_db'
        
        elif model._meta.app_label == 'hfs': 
            return 'hfs_db'

        elif model._meta.app_label == 'harbourvest': 
            return 'harbourvest_db'

        elif model._meta.app_label == 'peg': 
            return 'peg_db'

        return 'default'

    def db_for_write(self, model, **hints):

        if model._meta.app_label == 'staffing': 
            return 'staffing_db'

        elif model._meta.app_label == 'hfs': 
            return 'hfs_db'

        elif model._meta.app_label == 'harbourvest': 
            return 'harbourvest_db'

        elif model._meta.app_label == 'peg': 
            return 'peg_db'

        return 'default'

    def allow_relation(self, obj1, obj2, **hints):

        if obj1._meta.app_label == 'staffing' and obj2._meta.app_label == 'staffing':
            return True

        elif obj1._meta.app_label == 'harbourvest' and obj2._meta.app_label == 'harbourvest':
            return True

        elif obj1._meta.app_label == 'peg' and obj2._meta.app_label == 'peg':
            return True

        return 'default'

    def allow_migrate(self, db, app_label, model_name=None, **hints):

        if db == 'staffing_db':
            if app_label == 'staffing': return True
            else: return False

        elif db == 'hfs_db':
            if app_label == 'hfs': return True
            else: return False

        elif db == 'harbourvest_db':
            if app_label == 'harbourvest': return True
            else: return False

        elif db == 'peg_db':
            if app_label == 'peg': return True
            else: return False

        else:
            if app_label == 'staffing': return False
            else: return True
 